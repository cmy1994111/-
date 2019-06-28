const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
gulp.task("copyHtml",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
;
});
gulp.task("copyImg",function(){
	gulp.src("imgs/**").pipe(gulp.dest("dist/img"));
});
gulp.task("copyJs",function(){
	gulp.src("js/**").pipe(gulp.dest("dist/js"));
});
gulp.task("copyData",function(){
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));
});
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});
gulp.task("concat",function(){
	gulp.src(["js/*.js"])
	.pipe(concat("main.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("main.min.js"))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("uglify",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest("dist/js"));
});
gulp.task("cleanCss",function(){
	gulp.src("css/*.css")
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"));
})
gulp.task("babel",function(){
	gulp.src("js/es6.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
})
gulp.task("watch",function(){
	gulp.watch("*.html",["copyHtml"]);
	gulp.watch("imgs/**",["copyImg"]);
	gulp.watch(["xml/*.xml","json/*.json"],["copyData"]);
	gulp.watch("sass/*.scss",["sass"]);
});

gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true 
	})
})


gulp.task("build",["copyHtml","copyImg","copyData","sass","copyImg"]);

gulp.task("default",["server","watch"]);