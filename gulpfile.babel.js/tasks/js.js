import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// plugins
import babel from "gulp-babel";
import webpack from "webpack-stream";

// JavaScript processing
const js = () => {
    return gulp.src(path.js.src, { sourcemaps: app.isDev })
        .pipe(plug.plumber(plug.notify.onError({
            title: "JS",
            message: "Error <%= error.message %>"
        })))
        .pipe(babel())
        .pipe(webpack(app.webpack))
        .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }));
};

export { js };
