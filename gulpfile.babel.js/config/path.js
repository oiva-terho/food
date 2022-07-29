const pathSrc = "./src";
const pathDest = "./dist";

export const path = {
    pathSrc: pathSrc,
    root: pathDest,
    pug: {
        src: `${pathSrc}/pug/*.pug`,
        watch: `${pathSrc}/pug/**/*.pug`,
        dest: pathDest
    },
    sass: {
        src: `${pathSrc}/sass/*.{sass,scss}`,
        watch: `${pathSrc}/sass/**/*.{sass,scss}`,
        dest: pathDest
    },
    js: {
        src: `${pathSrc}/js/*.js`,
        watch: `${pathSrc}/js/**/*.js`,
        dest: pathDest
    },
    img: {
        src: `${pathSrc}/img/**/*.{png,jpg,jpeg,gif,ico,svg}`,
        watch: `${pathSrc}/img/**/*.{png,jpg,jpeg,gif,ico,svg}`,
        dest: `${pathDest}/img`
    },
    svg: {
        src: `${pathSrc}/svg/**/*.svg`,
        dest: pathSrc
    },
};