/**
 * Created by HelenYin on 2016/4/29.
 */

var gulp = require('gulp');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    console.log('Hello world!');
});

gulp.task('greet', function () {
    console.log('Hello world!');
});

gulp.task('build', ['css', 'js', 'imgs']);

gulp.task('css', ['greet'], function () {
    // Deal with CSS here
    console.log("Hello world!css")
});

gulp.task('js', ['greet'], function () {
    // Deal with CSS here
    console.log("Hello world! js")
});

gulp.task('imgs', ['greet'], function () {
    // Deal with CSS here
    console.log("Hello world! imgs")
});