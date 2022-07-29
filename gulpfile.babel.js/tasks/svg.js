import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// plugins
import svgSprite from "gulp-svg-sprite";

// svg processing
const svg = () => {
    return gulp.src(path.svg.src)
        .pipe(plug.plumber(plug.notify.onError({
            title: "SVG",
            message: "Error <%= error.message %>"
        })))
        .pipe(svgSprite(app.svgSprite))
        .pipe(gulp.dest(path.svg.dest));
};

export { svg };
