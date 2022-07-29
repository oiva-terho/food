import gulp from "gulp";
// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// Plugins
import pugPlug from "gulp-pug";
import webpHtml from "gulp-webp-html";

// Pug processing
const pug = () => {
    return gulp.src(path.pug.src)
        .pipe(plug.plumber(plug.notify.onError({
            title: "PUG",
            message: "Error <%= error.message %>"
        })))
        .pipe(pugPlug(app.pug))
        .pipe(webpHtml())
        .pipe(gulp.dest(path.pug.dest));
};

export { pug };
