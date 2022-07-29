//import news from "../../data/news.json";
import db from "../../src/data/db.json";

import process from "process";

const isProd = process.argv.includes('--prod');
const isDev = !process.argv.includes('--prod');

export const app = {
    db: db,
    isProd: isProd,
    isDev: isDev,
    htmlmin: {
        collapseWhitespace: isProd
    },
    pug: {
        pretty: isDev,
/*         data: {
            news: news,
        } */
    },
    webpack: {
        mode: isProd ? "production" : "development",
        output: {
            filename: 'index.js',
        }
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ["ttf", "woff", "svg"]
    },
    svgSprite: {
        mode: {
            stack: {
                sprite: `../img/icons.svg`,
                example: true
            }
        }
    }
};