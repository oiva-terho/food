import browserSync from "browser-sync";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import gulpif from "gulp-if";

export const plug = {
    browserSync: browserSync,
    plumber: plumber,
    notify: notify,
    newer: newer,
    gulpif: gulpif
};