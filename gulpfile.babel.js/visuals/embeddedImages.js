const { src, dest, parallel, series } = require('gulp');
import { paths } from "../variables"
import { moveImages } from "../movers/moveImages"

//images
const imagemin = require('gulp-imagemin');
const jpegtran = require('imagemin-jpegtran');
const gm = require('gulp-gm');

const {
    images: {
        input: input,
        src: source
    }
} = paths;

exports.moveImages = moveImages;

// Large images
function imagesProcess(done) {
    return src(input)
        .pipe(gm(function (gmfile) {
            return gmfile.setFormat('jpg'),
                gmfile.resample(144, 144),
                gmfile.quality(82),
                gmfile.filter('triangle'),
                gmfile.unsharp('0.25x0.25+8+0.065'),
                gmfile.interlace('none'),
                gmfile.colorspace('sRGB'),
                gmfile.resize(700) // Resize to 1400px width, auto height
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

        .pipe(dest(source));
        done();
    }

exports.embeddedImages = series(parallel(imagesProcess), series(moveImages));


