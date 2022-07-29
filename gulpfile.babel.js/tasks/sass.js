import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// plugins
import gulpSass from "gulp-sass";
import compSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
import groupMedia from "gulp-group-css-media-queries";
import sassGlob from "gulp-sass-glob";
import webpCss from "gulp-webp-css";

// sass processing
const gsass = gulpSass(compSass);
const sass = () => {
    return gulp.src(path.sass.src, { sourcemaps: app.isDev })
        .pipe(plug.plumber(plug.notify.onError({
            title: "SASS",
            message: "Error <%= error.message %>"
        })))
        .pipe(sassGlob())
        .pipe(gsass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupMedia())
        .pipe(size({ title: "style.css" }))
        .pipe(gulp.dest(path.sass.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "style.min.css" }))
        .pipe(gulp.dest(path.sass.dest, { sourcemaps: app.isDev }));
};

export { sass };
