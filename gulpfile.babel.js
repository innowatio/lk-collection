import gulp from "gulp";
import {execSync} from "child_process";
import babel from "gulp-babel";
import eslint from "gulp-eslint";

gulp.task("build", function () {
    try {
        execSync("rm -r dist/");
    } catch (err) {
        // Ignore
    }
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/"));
});

gulp.task("test", function () {
    execSync("npm test", {
        stdio: [null, process.stdout]
    });
});

gulp.task("lint", function () {
    return gulp.src(["src/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task("default", ["test", "lint"], function () {
    return gulp.watch(["src/**/*.js", "test/**/*.js"], ["test", "lint"]);
});
