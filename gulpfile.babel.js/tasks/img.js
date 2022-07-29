import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// Plugins
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";

// Images processing
const img = () => {
    return gulp.src(path.img.src)
        .pipe(plug.plumber(plug.notify.onError({
            title: "Img",
            message: "Error <%= error.message %>"
        })))
        .pipe(plug.newer(path.img.dest))
        .pipe(webp())
        .pipe(gulp.dest(path.img.dest))
        .pipe(gulp.src(path.img.src))
        .pipe(plug.newer(path.img.dest))
        .pipe(plug.gulpif(app.isProd, imagemin(app.imagemin)))
        .pipe(gulp.dest(path.img.dest));
};

export { img };
