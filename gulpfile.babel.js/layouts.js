const { src, dest } = require('gulp');
import { paths, cacheBustNames } from "./variables"

const fileinclude = require('gulp-file-include');
const replace = require('gulp-replace');

const { scriptname, searchname, adminname } = cacheBustNames;

// moves page templates from src to testing
function layouts() {
    return src(paths.pageLayouts.input)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(replace(/\*cachebustthis\*/g, scriptname)) // adds cachebusted name of scripts to js links file
    .pipe(replace(/\*cachebustsearch\*/g, searchname)) // adds cachebusted name of scripts to js links file
    .pipe(replace(/\*cachebustadmin\*/g, adminname)) // adds cachebusted name of scripts to js links file

    .pipe(dest(paths.pageLayouts.testing))
}

exports.layouts = layouts;