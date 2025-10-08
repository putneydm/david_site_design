const { src, dest, parallel, series } = require('gulp');
const del = require('del');
import { paths } from "../variables"

//images
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const gm = require('gulp-gm');
const rename = require('gulp-rename');

const {
    images: {
        output: output,
        testing: testing,
        dist: dist,
    }
} = paths;


const cleanImages = () => del([`${testing}/{*.jpg,*.tiff,*.png}`, `${dist}/{*.jpg,*.tiff,*.png}`], { force: true });


function moveImages(done) {
    console.log("move")
    return src([`${output}/{*.jpg,*.tiff,*.png}`])
    .pipe(dest(testing))
    .pipe(dest(dist));
}

exports.images = series(cleanImages, moveImages);