let csvToJson = require('convert-csv-to-json');
var probe = require('probe-image-size');

const uploadCsv = async (req, res, next) => {
	try {
		const csvfile = req.file;
		let errorResponse = [];
		const fileData = [];

		let csvData = csvToJson.parseSubArray('*',',').getJsonFromCsv(csvfile.path);

		for(const i in csvData) {
			let obj = {};
			const picture = {};

			for (const property in csvData[i]) {
				obj[(property.replace('"', '')).replace('"', '')] = (csvData[i][property].replace('"', '')).replace('"', '');
			};
			fileData.push(obj);

			try {
				const pic = await probe(fileData[i].url);
				picture.url = pic.url;
				picture.width = pic.width;
				picture.height = pic.height;
				fileData[i].picture = picture;
			} catch(error) {
				fileData[i].error = `Not able to calculate the width and height of the picture with record id: ${fileData[i].id}.`;
				errorResponse.push(fileData[i].error);
			}
		}
		res.status(200).json(handleResponse(fileData, errorResponse));
	} catch (error) {
		console.log(error);
		errorResponse.push(error);
		res.status(500).json(handleError(null, error));
	}
}

const handleResponse = (body, error, metadata) => {
  let response = {
      status: 'SUCCESS',
      data: body || [],
      error: error || []
  }
  if (metadata) {
      response.metadata = metadata;
  }
  return response;
};

const handleError = (body, error, status) => {
  let errorObject = {
    data: body || [],
    error: error || [],
    status: status
  }
  return errorObject;
};

module.exports = {
	uploadCsv,
	handleResponse,
	handleError
}

