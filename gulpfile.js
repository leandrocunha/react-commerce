var babelify    = require('babelify'),
    browserify  = require('browserify'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util');
    jeet        = require('jeet'),
    livereload  = require('gulp-livereload'),
    nib         = require('nib'),
    notify      = require('gulp-notify'),
    plumber     = require('plumber'),
    source      = require('vinyl-source-stream'),
    stylus      = require('gulp-stylus'),
    uglify      = require('gulp-uglify'),
    watchify    = require('watchify');

var vendors = [
    'react',
    'react-dom',
    'react-page',
    'jquery'
  ];

var sourceMapper = function (sourceMapPath) {
  return function (err, src, map) {
    var fs = require('fs');
    fs.open(sourceMapPath, 'w', function (err, fd) {
      if (err) {
        return;
      }
      fs.write(fd, map, function (err) {
        if (err) {
          return;
        }
      });
    });
  }
};

// Functions
function buildVendors(options) {
  var b = browserify({ fullPaths: false, debug: true });  
  var sourceFName = 'vendors.js.map';

  options.uglify &&
    b.plugin('minifyify', {
      map: sourceFName,
      output: 'assets/js/' + sourceFName,
      uglify: {
          keep_fnames: true,
          mangle: false
        }
      });

  return b.require(vendors)
    .bundle(options.uglify && sourceMapper('assets/js/' + sourceFName))
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('assets/js'));
}

function buildApp(options) {
  var b = browserify({
    transform: [babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
  })
    .require(require.resolve('./src/js/app.js'), {entry: true})
    .external(vendors);

  var sourceFName = 'app.js.map';

  options.uglify &&
    b.plugin('minifyify', {
      map: sourceFName,
      output: './assets/js/' + sourceFName,
      uglify: {
          keep_fnames: true,
          mangle: false
        }
      });

  var rebundle = function () {
    var start = Date.now();
    b.bundle(options.uglify && sourceMapper('assets/js/' + sourceFName))
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(notify(function () {
        console.log('Built in ' + (Date.now() - start) + 'ms');
      }))
      .pipe(livereload());
  };

  if (options.watch) {
    b = watchify(b);
    b.on('update', rebundle);
  }

  return rebundle();
}

// Setup Tasks
gulp.task('vendors-dev', function () {
  return buildVendors({uglify: false});
});

gulp.task('vendors', function () {
  process.env.NODE_ENV = 'production';
  return buildVendors({uglify: true});
});

gulp.task('app-dev', function () {
  return buildApp({
    watch: true,
    dest: './build/js',
    uglify: false
  });
});

gulp.task('app', function () {
  return buildApp({
    watch: false,
    dest: './build/js',
    uglify: true
  });
});

gulp.task('stylus', function() {
  gulp
   .src('src/stylus/app.styl')
   .pipe(stylus({use: [nib(), jeet()]}))
   .pipe(gulp.dest('build/css/'))
   .pipe(livereload());
});

gulp.task( 'watch', function() {
  livereload.listen();
  gulp.watch('src/stylus/**/*.styl', ['stylus']);
})

gulp.task('default', ['vendors-dev', 'app-dev', 'stylus', 'watch']);
gulp.task('build', ['vendors', 'app', 'stylus']);
