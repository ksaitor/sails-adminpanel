import {ObservablePromise} from "../observablePromise";

export default abstract class InstallStepAbstract {
    public abstract id: string
    public abstract title: string
    public abstract badge: string
    public abstract sortOrder: number
    /** Step can be skipped. For this option you should do realization for skip handler */
    public abstract canBeSkipped: boolean
    public abstract description: string
    public abstract scriptsUrl: string
    public abstract stylesUrl: string
    /** Absolute path to ejs template */
    public abstract ejsPath: string
    public abstract renderer: "ejs" | "jsonforms"
    public isSkipped: boolean = false
    public isProcessed: boolean = false;
    /** Data that will be given to browser */
    public payload: any = {};
    public groupSortOrder: number = 1;
    public finallyPromise: ObservablePromise<void> = null;
    public finallyDescription: string = null;
    /**
     * A sign that finalization should be started
     */
    public finallyToRun: boolean = false;
    /** Action that will be run when saving data to storage */
    public abstract process(data: any, context?: any): Promise<void>

    /** Method will be called after processing step (both process or skip) */
    public finally(data: any, context?: any): Promise<void> {
        return null;
    }

    /** This method will be called by InstallStepper and is a wrapper for "finally" method */
    public toFinally(data?: any, context?: any, timeout: number = 15*60*1000): void {
        
        if(typeof arguments[0] === "number") {
            timeout = arguments[0];
        }

        if (this.finallyPromise && this.finallyPromise.status === "pending") {
            sails.log.warn(`Method "finally" was already executed and won't be executed again`);
        } else {
            this.finallyPromise = new ObservablePromise(this.finally(data, context), timeout)
        }

        this.finallyPromise.promise;
    }

    /** Action that will be run when skipping the step */
    protected abstract skip(): Promise<void>

    /** This method will be called by InstallStepper and is a wrapper for "skip" method */
    public async skipIt(): Promise<void> {
        if (this.canBeSkipped === false) {
            throw `Step [${this.title}] can not be skipped`
        } else {
            await this.skip()
        }
    }

    /** Checks that step should be processed during install */
    public abstract check(): Promise<boolean>
}
