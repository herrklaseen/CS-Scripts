/**********************************************************

ExportWebSizes.jsx

DESCRIPTION

This script opens illustrator files from a source folder,
generates JPEG and PNG files of predefined widths in a destination
folder.

Feel free to copy, modify and use.

**********************************************************/

#target photoshop

main();
function main(){
  var doc;
  var startResolution = 300;
  var sourceFolder = Folder.selectDialog( "Please select source folder" );
  if ( sourceFolder == null ) return;

  var destinationFolder = Folder.selectDialog( "Please select destination folder" );
  if ( destinationFolder == null ) return;

  var fileList = sourceFolder.getFiles( "*.ai" );
  for ( var f in fileList ) {
    open( fileList[f], openOptions( startResolution ) );
    doc = app.activeDocument;
    var targetWidths = [1800, 900, 450, 200];
    var savePath = '';

    // Check that size of image is greater than targetWidth.
    // Open with higher resolution if not.
    if ( doc.width < UnitValue( targetWidths[0], "px" ) ) {
      var newResolution = ( targetWidths[0] + 200 ) / ( doc.width.value / startResolution )
      app.activeDocument.close( SaveOptions.DONOTSAVECHANGES );
      open( fileList[f], openOptions( newResolution ) );
      doc = app.activeDocument;
    }

    for ( var rI = 0; rI < targetWidths.length; rI++ ) {
      doc.resizeImage( UnitValue( targetWidths[rI], "px" ), null, null, ResampleMethod.BICUBIC );
      savePath = destinationFolder + "/" + doc.name + "-" + targetWidths[rI];
      saveToJPEG(savePath);
      saveToPNG(savePath);
      doc.activeHistoryState = doc.historyStates[0];
    }
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  }
}

function openOptions(resolution) {
  var options = new PDFOpenOptions();
  options.antiAlias = true;
  options.bitsPerChannel = BitsPerChannelType.EIGHT;
  options.cropPage = CropToType.MEDIABOX;
  options.mode = OpenDocumentMode.RGB;
  options.resolution = resolution;
  return options;
}

function saveToJPEG(path) {
  var saveFile = new File( path + ".jpg" );
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.JPEG;
  sfwOptions.includeProfile = false;
  sfwOptions.interlaced = false;
  sfwOptions.optimized = false;
  sfwOptions.quality = 90;

  activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
}

function saveToPNG(path) {
  var saveFile = new File( path + ".png" );
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.PNG;
  sfwOptions.PNG8 = false;
  sfwOptions.includeProfile = false;
  sfwOptions.interlaced = false;

  activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
}
