const { src, dest, parallel, series } = require('gulp');
import { paths } from "../variables"
import { moveImages } from "../movers/moveImages"

//images
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const rename = require('gulp-rename');
const gm = require('gulp-gm');

const {
    images: {
        input: input,
        src: source
    }
} = paths;

exports.moveImages = moveImages;

// Large images
function imagesLarge(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
            return gmfile.setFormat('jpg'),
                gmfile.resample(72, 72),
                gmfile.resize(1400), // Resize to 1400px width, auto height
                gmfile.quality(90),
                gmfile.filter('triangle'),
                gmfile.unsharp('0.25x0.25+8+0.065'),
                gmfile.interlace('none'),
                gmfile.colorspace('sRGB')
        }, 
        {
            imageMagick: true
        }
        ))
        // Crunches Images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))
    // Renames images
        .pipe(rename({
            prefix: 'large_'
        }))
        .pipe(dest(source));
        done();
    }

// Small images
function imagesSmall(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
            return gmfile.setFormat('jpg'),
                gmfile.resample(72, 72),
                gmfile.resize(900), // Resize to 1400px width, auto height
                gmfile.quality(90),
                gmfile.filter('triangle'),
                gmfile.unsharp('0.25x0.25+8+0.065'),
                gmfile.interlace('none'),
                gmfile.colorspace('sRGB')
        }, 
        {
            imageMagick: true
        }
        )) 
        // Crunches Images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))

    // Renames images
        .pipe(rename({
            prefix: 'small_'
        }))
        .pipe(dest(source));
        done();
    }

exports.embeddedImages = series(parallel(imagesLarge, imagesSmall), series(moveImages));