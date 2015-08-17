#target "photoshop"

// Sourced from http://blog.wp.weightpoint.se/2012/02/02/batch-export-photoshop-psd-files-to-png-the-right-way/

var inputFolder = Folder.selectDialog("Input folder");
var outputFolder = Folder.selectDialog("Output folder");

if (inputFolder != null && outputFolder != null) {
  var files = inputFolder.getFiles("*.psd");

  for (var i = 0; i < files.length; i++) {

    var file = files[i];
    var doc = app.open(file);

    var options = new PNGSaveOptions();
    options.compression = 5;
    options.interlaced = false;

    var saveFile = new File(outputFolder + '/' + doc.name);

    doc.saveAs(saveFile, options, true, Extension.LOWERCASE);
    doc.close(SaveOptions.DONOTSAVECHANGES);
  }
}
