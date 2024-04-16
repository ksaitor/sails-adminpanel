import {AccessRightsHelper} from "../helper/accessRightsHelper";
import {InstallStepper} from "../lib/installStepper/installStepper";
import * as path from "path";

export default async function processInstallStep(req, res) {
	if (sails.config.adminpanel.auth) {
		if (!req.session.UserAP) {
			return res.redirect(`${sails.config.adminpanel.routePrefix}/model/userap/login`);
		} else if (!AccessRightsHelper.havePermission(`process-install-step`, req.session.UserAP)) {
			return res.sendStatus(403);
		}
	}

	if (req.method.toUpperCase() === 'GET') {
		sails.log.debug("GET REQUEST TO PROCESS INSTALL STEP")

		if (InstallStepper.hasUnprocessedSteps() || InstallStepper.hasUnfinalizedSteps()) {
			let renderData = InstallStepper.render(req.session.UserAP.locale);
			let renderer = renderData.currentStep.renderer;

			return res.viewAdmin(`installer/${renderer}`, renderData);
			// return res.viewAdmin(`installer/dev`, renderData);
		} else {
			return res.redirect(`${sails.config.adminpanel.routePrefix}`);
		}
	}

	if (req.method.toUpperCase() === 'POST') {

		try {
			sails.log.debug("POST REQUEST TO PROCESS INSTALL STEP", req.body)

			const currentStepId = req.body.currentStepId;
			const filesCounter = req.body.filesCounter;

			// upload files before processing other fields (filesCounter > 0 means that req contains files)
			let uploadedFiles = [];
			if (filesCounter && filesCounter > 0) {
				for (let i = 0; i < filesCounter; i++) {
					let filesUpstream = req.file(`files_${i}`);

					try {
						let uploadedFile = await uploadFiles(filesUpstream, currentStepId);
						uploadedFiles.push(uploadedFile);
					} catch (error) {
						console.error('Error uploading files:', error);
					}
				}
			}

			if (req.body.action === 'next') {
				const inputData = JSON.parse(req.body.inputData);
				if (uploadedFiles.length) {
					inputData.uploadedFiles = uploadedFiles;
				}

				// trying to process step
				await InstallStepper.processStep(currentStepId, inputData);

			} else if (req.body.action === 'skip') {
				// trying to skip step
				await InstallStepper.skipStep(currentStepId);

			} else {
				return res.status(400).send("Invalid action parameter");
			}

			// go back to stepper if there are more unprocessed steps, otherwise go back to /admin
			if (InstallStepper.hasUnprocessedSteps()) {
				return res.redirect(`${sails.config.adminpanel.routePrefix}/processInstallStep`);

			} else {
				return res.redirect(`${sails.config.adminpanel.routePrefix}`);
			}

		} catch (error) {
			console.error("Error processing step:", error);
			return res.status(500).send("Error processing step");
		}
	}

	return res.status(500).send("Invalid request method")
};

function uploadFiles(files, currentStepId) {
	// TODO: Investigate system hang when trying to save a file, and execution of the code after save block does not process.
	//  The system seems to only proceed after encountering a timeout error.
	//  This issue is ruining the ability to upload multiple files.

	return new Promise((resolve, reject) => {
		files.upload({
			dirname: `installStepper/uploadedImages`,
			maxBytes: 100000000,
			saveAs: function (file, cb) {
				const extension = path.extname(file.filename);
				const baseName = path.basename(file.filename, path.extname(file.filename));
				const uniqueName = `${currentStepId}_${baseName}_${Date.now()}${extension}`;
				cb(null, uniqueName);
			}
		}, (err, uploadedFiles) => {
			if (err) {
				console.error(err);
				reject(err);

			} else if (uploadedFiles && uploadedFiles.length > 0) {
				const uploadedFile = uploadedFiles[0];
				const uploadedFileName = uploadedFile.fd;
				sails.log.debug("DOWNLOADED FILE", uploadedFileName);
				resolve(uploadedFileName);

			} else {
				reject(new Error("No files were uploaded"));
			}
		});
	});
}
