var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefix = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps');


var paths = {
  css: ['css/*.css'],
  img: ['imagesnew/*.png'],
  js:['js/*.js']

};

//css to minicss
gulp.task('minicss', function() {
  return gulp.src(paths.css)
    .pipe(autoprefix('last 2 versions'))
    //.pipe(minifycss({keepBreaks:true}))
    .pipe(minifycss())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});


gulp.task('compressimg',function(){
    return gulp.src(paths.img)
      .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
      .pipe(gulp.dest('dist/images'));
});

gulp.task('images',function(){
  /* 查找img 路径下的所有文件 */
  return gulp.src(paths.img)
       .pipe(
          imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })
        )
       .pipe(gulp.dest('dist/images'))
});

gulp.task('default', function () {
    return gulp.src(paths.img)
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('dist/images2'));
});

gulp.task('compressjs', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.css, ['minicss']);
  gulp.watch(paths.img, ['compressimg']);
  gulp.watch(paths.js, ['compressjs']);
});

gulp.task('default', ['minicss','compressimg','compressjs']);