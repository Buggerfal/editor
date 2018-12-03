const gulp = require('gulp');
var gulpBase64 = require("gulp-to-base64");

gulp.task('base64', function() {
    return gulp.src("./images/*.{png,jpg,jpeg,mp3,svg,ttf}")
        .pipe(gulpBase64({
            outPath: "js/source/images.js" //output file path
        }))
});