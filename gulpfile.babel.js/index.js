import gulp from "gulp";
import jsonServer from 'json-server';

// Configuration
import { path } from "./config/path.js";
import { app } from "./config/app.js";
import { plug } from "./config/plugins.js";

// Tasks
import { clear } from "./tasks/clear.js";
import { pug } from "./tasks/pug.js";
import { sass } from "./tasks/sass.js";
import { js } from "./tasks/js.js";
import { img } from "./tasks/img.js";
import { svg } from "./tasks/svg.js";

// Server
const servers = () => {
    const server = jsonServer.create();
    const router = jsonServer.router(app.db);
    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use(router);
    server.listen(3000, () => {
        console.log('JSON Server is running');
    });

    plug.browserSync
    .init({
        server: {
            baseDir: path.root
        },
        socket: {
            domain: 'localhost:3001'
        }
    });
};

// Watcher
const watcher = () => {
    gulp.watch(path.pug.watch, pug).on("all", plug.browserSync.reload);
    gulp.watch(path.sass.watch, sass).on("all", plug.browserSync.reload);
    gulp.watch(path.js.watch, js).on("all", plug.browserSync.reload);
    gulp.watch(path.img.watch, img).on("all", plug.browserSync.reload);
};

const build = gulp.series(
    // font,
    clear,
    gulp.parallel(pug, sass, js, img)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, servers)
);

// Tasks
export { pug };
export { sass };
export { watcher };
export { js };
export { img };
export { svg };

// Compile
export { build };
export { dev };
export default dev;
