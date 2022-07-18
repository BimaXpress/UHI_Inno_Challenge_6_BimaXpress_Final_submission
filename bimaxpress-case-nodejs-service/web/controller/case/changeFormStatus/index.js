const { Cases } = require('../../../../models/mongoose');
const createError = require('http-errors');
const axios = require('axios');
const FormData = require('form-data');

const ChangeFormStatus = async (req, res, next) => {
  try {
    const caseId = req.body.caseId;
    const formStatus = req.body.formStatus;
    const action = req.body.action;
    const summary = req.body.summary;
    const AllowedFormStatus = [
      'FormCreation',
      'Draft',
      'Unprocess',
      'Query',
      'Approved',
      'Reject',
      'Enhance',
      'Fci',
      'Discharge Approved',
      'Settled',
    ];
    const AllowedAction = [
      'FormCreation',
      'Unprocessed',
      'Query',
      'Approved',
      'Reject',
      'Enhance',
      'Fci',
      'Discharge Approved',
      'Settled',
    ];
    const AllowedSummary = [
      'PreAuth Creation',

      'Unprocessed',

      'Query',

      'Approved',

      'Rejected',

      'Enhance Requested',
      'Enhance Rejected',
      'Enhance Approved',

      'Final Claim Initiated',
      'Final Claim Rejected',

      'Discharge Approved',

      'Settled',
    ];
    var myregexp = /^[0-9a-fA-F]{24}$/;

    //exception of requirement.
    if (!caseId || !formStatus || !action || !summary) {
      const error = {
        error: true,
        status: 400,
        message: 'caseId ,action,summary and formStatus is required!',
      };
      throw error;
    }
    if (!caseId.match(myregexp)) {
      const error = {
        status: 400,
        message: 'caseId is not valid for mongoDB!',
      };
      throw error;
    }

    //checking if its allowed or not.
    if (!AllowedFormStatus.includes(formStatus)) {
      const error = {
        error: true,
        status: 406,
        message: 'Enter valid formStatus value',
      };
      throw error;
    }
    if (!AllowedAction.includes(action)) {
      const error = {
        error: true,
        status: 406,
        message: 'Enter valid action value',
      };
      throw error;
    }
    if (!AllowedSummary.includes(summary)) {
      const error = {
        error: true,
        status: 406,
        message: 'Enter valid summary value',
      };
      throw error;
    }

    //for taking url throughh upload Api.
    let documentArray;
    const docsArrayUrl = [];
    if (req.files.length !== 0) {
      try {
        //exceptions of requirement
        if (!req.body.folderName) {
          const error = {
            status: 400,
            message: 'folderName is required',
          };
          throw error;
        }

        if (!req.body.fileName) {
          const error = {
            status: 400,
            message: 'fileName is required / fileName is not provided in array',
          };
          throw error;
        }

        if (req.body.fileName.length !== req.files.length) {
          const error = {
            status: 409,
            message: 'fileName array does not match with uploadFiles',
          };
          throw error;
        }

        //creating data format to post into API.
        const formData = new FormData();
        formData.append('folderName', req.body.folderName);

        req.body.fileName.map((item, index) => {
          formData.append(`fileName[${index}]`, item);
        });

        req.files.map((file) => {
          formData.append(`uploadFile`, file.buffer, file.originalname);
        });

        //CALLING API upload files to upload files.
        let uploadAPIResult;
        try {
          uploadAPIResult = await axios({
            method: 'post',
            url: `https://api.testing.onboarding.bimaxpress.com/uploadFiles`,
            data: formData,
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          });
        } catch (error) {
          throw error?.response?.data?.error;
        }

        //storing url array to post into doc array in audit trail.
        console.log('uploadAPIResult.data.urls', uploadAPIResult.data.urls);

        documentArray = uploadAPIResult.data.urls;
        //taking only url out.
        for (let i = 0; i < documentArray.length; i++) {
          docsArrayUrl[i] = uploadAPIResult.data.urls[i].url;
        }
      } catch (error) {
        throw error;
      }
    }

    const newItemAuditTrail = {
      action: req.body.action,
      lastDate: new Date(),
      summary: req.body.summary,
      amount: req.body.amount,
      documents: docsArrayUrl,
    };

    console.log('newItemAuditTrail', newItemAuditTrail);

    //updating audit trail and formstatus.
    const caseDataToUpdate = await Cases.findByIdAndUpdate(
      { _id: caseId },
      {
        formStatus: req.body.formStatus,
        $push: { auditTrail: newItemAuditTrail },
      },
      { useFindAndModify: false, new: true }
    );

    // error for data not found
    if (!caseDataToUpdate) {
      const error = {
        status: 404,
        message: "caseId doesn't exist!",
      };
      throw error;
    }

    res.status(200).send({
      error: false,
      message: { formStatus: 'updated', caseDataToUpdate: caseDataToUpdate },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = ChangeFormStatus;
