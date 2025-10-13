const { src, dest, parallel, series } = require('gulp');
const del = require('del');
import { paths } from "../variables"

//images
const gm = require('gulp-gm');

const {
    images: {
        src: imgSource,
        testing: imgTesting,
        dist: imgDist,
    },
    slides: {
        src: slideSource,
        testing: slideTesting,
        dist: slideDist,
    },
} = paths;

const cleanImages = () => del([`${imgTesting}/{*.jpg,*.tiff,*.png}`, `${imgDist}/{*.jpg,*.tiff,*.png}`], { force: true });

const syncImages = (done) => {
    return src(`${imgSource}/{*.jpg,*.tiff,*.png}`)
    .pipe(dest(imgTesting))
    .pipe(dest(imgDist));
}

const cleanSlides = () => del([`${slideTesting}/{*.jpg,*.tiff,*.png}`, `${slideDist}/{*.jpg,*.tiff,*.png}`], { force: true });

const syncSlides = (done) => {
    return src(`${slideSource}/{*.jpg,*.tiff,*.png}`)
    .pipe(dest(slideTesting))
    .pipe(dest(slideDist));
}

exports.syncImages = series(cleanImages, cleanSlides, syncImages, syncSlides);