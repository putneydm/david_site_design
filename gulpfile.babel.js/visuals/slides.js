const { src, dest, parallel, series } = require('gulp');
import { paths } from "../variables"
import { moveSlides } from "../movers/moveSlides"

//images
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const gm = require('gulp-gm');
const rename = require('gulp-rename');

const {
    slides: {
        input: input,
        src: source
    }
} = paths;



exports.moveSlides = moveSlides;

function slideImagesLarge(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
         return gmfile
                .setFormat('jpg')
                .resample(72, 72)
                // 1. Force width to 3600 px, height auto (≥ 2120 after this)
                .resize(3600, null)
                // Ensure crop starts from top-left corner
                .gravity('NorthWest')
                // 2. Hard crop to exactly 3600×2120 from top-left (0,0)
                .crop(3600, 2120, 0, 0)
                .quality(82)
                .filter('Triangle')
                .unsharp(0.25, 0.25, 8, 0.065)
                .interlace('None')
                .colorspace('sRGB');
        }, {
            imageMagick: true
        }
        ))

        // Crunches Images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))

        // Renames Images
        .pipe(rename({
            prefix: 'large_'
        }))
        .pipe(dest(source));
        done();
    }


// Large medium
function slideImagesMed(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
            return gmfile
               .setFormat('jpg')
                .resample(72, 72)
                // 1. Force width to 3600 px, height auto (≥ 2120 after this)
                .resize(1800, null)
                // Ensure crop starts from top-left corner
                .gravity('NorthWest')
                // 2. Hard crop to exactly 3600×2120 from top-left (0,0)
                .crop(1800, 1060, 0, 0)
                .quality(82)
                .filter('Triangle')
                .unsharp(0.25, 0.25, 8, 0.065)
                .interlace('None')
                .colorspace('sRGB');
        }, {
            imageMagick: true
        }
        ))

        // Crunches Images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))

        // Renames Images
        .pipe(rename({
            prefix: 'med_'
        }))

        .pipe(dest(source));
        done();
    }

// Small images
function slideImagesSmall(done) {
    src(input)
        .pipe(gm(function (gmfile) {
            return gmfile
                .setFormat('jpg')
                .resample(72, 72)
                // 1. Force width to 3600 px, height auto (≥ 2120 after this)
                .resize(900, null)
                // Ensure crop starts from top-left corner
                .gravity('NorthWest')
                // 2. Hard crop to exactly 3600×2120 from top-left (0,0)
                .crop(900, 530, 0, 0)
                .quality(82)
                .filter('Triangle')
                .unsharp(0.25, 0.25, 8, 0.065)
                .interlace('None')
                .colorspace('sRGB');
        }, {
            imageMagick: true
        }))

        // Crunches images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))

        // Renames images
        .pipe(rename({
            prefix: 'small_'
        }))

        .pipe(dest(source));
        done()
}

// x-small images
function slideImagesXSmall(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
            return gmfile
                .setFormat('jpg')
                .resample(72, 72)
                // 1. Force width to 3600 px, height auto (≥ 2120 after this)
                .resize(450, null)
                // Ensure crop starts from top-left corner
                .gravity('NorthWest')
                // 2. Hard crop to exactly 3600×2120 from top-left (0,0)
                .crop(450, 265, 0, 0)
                .quality(82)
                .filter('Triangle')
                .unsharp(0.25, 0.25, 8, 0.065)
                .interlace('None')
                .colorspace('sRGB'); 
        }, {
            imageMagick: true
        }))

        // Crunches images
        .pipe(imagemin({
            progressive: true,
            use: [jpegtran()]
        }))

        // Renames images
        .pipe(rename({
            prefix: 'xsmall_'
        }))

        .pipe(dest(source));
        done()
}

exports.slideImages = series(parallel(slideImagesLarge, slideImagesMed, slideImagesSmall, slideImagesXSmall), series(moveSlides));
