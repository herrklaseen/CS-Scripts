/**********************************************************

SaveAsPDF1point3.jsx

DESCRIPTION

This script gets files specified by the user from the
selected folder, creates outlines of all text and saves them
as PDF version 1.3 with the same file name in the user
desired destination. It was designed for use with EPS-files
exported from InDesign, but should work on other files as well.

Feel free to copy, modify and use.

**********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;

// Select the source folder.
sourceFolder = Folder.selectDialog('Select the folder with files you want to save as PDF v1.3', '~');

// If a valid folder is selected
if (sourceFolder != null) {
	files = new Array();
	fileType = prompt('Select type of files to you want to process. Eg: *.eps', '*.eps');

	// Get all files matching the pattern
	files = sourceFolder.getFiles(fileType);

	if (files.length > 0) {
		// Get the destination to save the files
		destFolder = Folder.selectDialog('Select the folder where you want to save the files.', '~');

		// Prevents from overwriting the files, user
		// cannot save to same folder.
		while (destFolder && destFolder.fullName == sourceFolder.fullName) {
			alert("Don't select the same folder as the source, this will overwrite your files.");
			destFolder = Folder.selectDialog("Select the folder where you want to save the files.", '~');
		}

		for (var i = 0; i < files.length; i++) {
			sourceDoc = app.open(files[i]); // returns the document object

			allTextOutlines(sourceDoc.textFrames);

			targetFile = getNewFile();
			pdfSaveOpts = getPDFOptions();

			sourceDoc.saveAs(targetFile, pdfSaveOpts);
			sourceDoc.close();
		}
		alert('Files are saved in ' + destFolder);
	} else {
		alert('No matching files found');
	}
}

/*********************************************************

allTextOutlines: Converts an array of textFrames to outlines.

**********************************************************/
function allTextOutlines(textFrames) {
	if (textFrames.length > 0) {
		// Reversed loop because creating
		// outlines also removes the textFrame
		for (var i = textFrames.length - 1; i >= 0; i -= 1) {
			textFrames[i].createOutline();
		}
	}
}

/*********************************************************

getNewFile: Function to get the new file. The primary
name is the same as the source file.

**********************************************************/

function getNewFile() {
	var docName, saveInFile;
	docName = sourceDoc.name;

	// Feel free to edit the file name if you
	// want rename the saved files.
	saveInFile = new File(destFolder + '/' + docName);

	return saveInFile;
}

/*********************************************************

getPDFOptions: Function to set the PDF saving options of the
files using the PDFSaveOptions object.

**********************************************************/

function getPDFOptions() {
	var pdfSaveOpts = new PDFSaveOptions();

	// Add more properties here if you like
	pdfSaveOpts.compatibility = PDFCompatibility.ACROBAT4; // == PDF 1.3

	return pdfSaveOpts;
}
