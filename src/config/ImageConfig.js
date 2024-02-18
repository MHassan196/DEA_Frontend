import fileDefault from '../assets/images/file-blank-solid-240.png';
import filePdf from '../assets/images/icons8-pdf-60.png';
import filePng from '../assets/images/icons8-png-48.png';
import fileJpg from '../assets/images/icons8-jpg-48.png';
import fileGif from '../assets/images/icons8-gif-48.png';
import fileWord from '../assets/images/icons8-word-48.png';
import fileExcel from '../assets/images/icons8-excel.png';

export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    jpg: fileJpg,
    jpeg: fileJpg,
    gif: fileGif,
    'vnd.openxmlformats-officedocument.wordprocessingml.document': fileWord,  // Word MIME type
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet': fileExcel,      // Excel MIME type
    'vnd.ms-excel': fileExcel,      // Excel MIME type
    'msword': fileWord,  // Word MIME type
}