import InstallStepAbstract from "./InstallStepAbstract";
import FinalizeStep from "./finalizeStep";
import * as fs from "fs";

interface RenderData {
    totalStepCount: number
    leftStepsCount: number
    currentStep: InstallStepAbstract
}

export class InstallStepper {
    private static steps: InstallStepAbstract[] = [];

    public static getSteps(): InstallStepAbstract[] {
        return this.steps;
    }

    public static async processStep(stepId: string, data: any) {
        try {
            /** As we sort steps by sortOrder, we should check that previous steps were processed */
            const stepIndex = this.steps.findIndex(item => item.id === stepId)
			console.log("STEP INDEX", stepIndex);
            for (let i = 0; i < stepIndex; i++) {
                if (this.steps[i].canBeSkipped && this.steps[i].isSkipped) {
                    continue
                }

                let checkResult = await this.steps[i].check();
                if (checkResult === false) {
                    throw `Previous step was not processed`
                }
            }

            let step = this.getStepById(stepId);
            await step.process(data);
			step.isProcessed = true;
			console.log(`STEP ${stepId} was processed`);

            // call finalize method
            step.toFinally()

        } catch (e) {
            sails.log.error(`Error processing step: ${e}`);
            console.dir(e);
            throw new Error(e);
        }
    }

    private static getStepById(stepId: string): InstallStepAbstract {
        return this.steps.find(item => item.id === stepId);
    }

    /** Prepares steps array for user interface render */
    public static render(): RenderData {
		let stepToRender = this.getNextUnprocessedStep();
		let leftSteps = this.steps.filter(step => !step.isProcessed && !step.isSkipped);

        // TODO there will be some checks about errors and some important properties

        return {totalStepCount: this.steps.length, leftStepsCount: leftSteps.length, currentStep: stepToRender};
    }

    public static async skipStep(stepId: string) {
        try {
            let step = this.getStepById(stepId);
            await step.skipIt();
			step.isSkipped = true;

        } catch (e) {
            sails.log.error(`Error skipping step: ${e}`);
        }
    }

    /** Add step (replace if it already exists) */
    public static addStep(step: InstallStepAbstract) {
        if (step.renderer === "ejs") {
            if (!step.ejsPath || !fs.existsSync(step.ejsPath)) {
                throw `Step [${step.title}] error: ejs path does not exists`
            }
        }

        const stepIndex = this.steps.findIndex(item => item.id === step.id)
        if (stepIndex !== -1) {
            this.steps[stepIndex] = step;

        } else {
            this.steps.push(step);
        }

        // sort by group, then by renderer and then by sortOrder
        this.steps.sort((a, b) => {
            if (a.groupSortOrder !== b.groupSortOrder) {
                return a.groupSortOrder - b.groupSortOrder;
            } else {
                if (a.renderer !== b.renderer) {
                    return a.renderer === 'ejs' ? -1 : 1;
                } else {
                    return a.sortOrder - b.sortOrder;
                }
            }
        });

    }

    public static hasUnprocessedSteps(): boolean {
        return this.steps.some(step => !step.isProcessed && !step.isSkipped);
    }

	public static getNextUnprocessedStep(): InstallStepAbstract {
        let nextStep = this.steps.find(step => !step.isProcessed && !step.isSkipped);
        console.log("NEXT STEP", nextStep)
        console.log("HAS UNFINALIZED STEPS", this.hasUnfinalizedSteps())
        console.log("ALL STEPS", this.getSteps())
        if (!nextStep && this.hasUnfinalizedSteps()) {
            if (this.getStepById("finalize")) {
                console.log("WE HAVE FINALIZE STEP")
                nextStep = this.getStepById("finalize")

            } else {
                let timer = setInterval(() => {

                    // clear steps if all of them was processed and finalized
                    if (!this.hasUnprocessedSteps() && !this.hasUnfinalizedSteps()) {
                        this.steps = []
                        console.log("CREARING STEPS")
                        clearInterval(timer);
                    }
                }, 5000)

                nextStep = new FinalizeStep();
                this.addStep(nextStep);
            }
        }

        return nextStep;
	}

    public static hasUnfinalizedSteps(): boolean {
        return this.steps.some(step => step.finallyPromise?.status === "pending");
    }

    public static getFinalizeStatus() {
        let stepsWithFinalize = this.steps.filter(step => step.finallyPromise !== null);
        let generalStatus = "fulfilled";
        let stepFinalizeStatuses = stepsWithFinalize.map(item => {
            // if one of them is pending, general status is pending
            if (item.finallyPromise.status === "pending") {
                generalStatus = "pending";
            }
            return {id: item.id, status: item.finallyPromise.status, description: item.finallyDescription}
        })

        return {status: generalStatus, finalizeList: stepFinalizeStatuses ?? []};
    }
}
