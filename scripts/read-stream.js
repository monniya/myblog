'use strict';

var config = {
  'jquery': '//cdn.bootcss.com/jquery/2.1.0/jquery.min.js',
  'jquery_lazyload': '//cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js',
  'img_placeholder': 'http://ww4.sinaimg.cn/large/e724cbefgw1etyppy7bgwg2001001017.gif'
}

if (hexo.config.image_stream) {
  for (var key in config) {
    if (hexo.config.image_stream[key] != null) {
      config[key] = hexo.config.image_stream[key];
    }
  }
}
hexo.extend.tag.register('readStream', function(args, content){
  var result = '';
  if (config['jquery']) {
    result += '<script src="' + config['jquery'] + '"></script>';
  }
  if (config['jquery_lazyload']) {
    result += '<script src="' + config['jquery_lazyload'] + '"></script>';
  }
  result += '<div class="hexo-img-readStream">';
  result += '<style type="text/css">';
  result += '.hexo-image-stream-lazy {display:block;}.hexo-img-readStream{width:100%;max-width:1100px;margin:3% auto}div.hexo-img-readStream readItems{ background: #fefefe;box-shadow: 0 1px 2px rgba(34, 25, 25, 0.2);margin: 0 0.5% 3%;padding: 0%;padding-bottom: 9px;display: inline-block;max-width: 42%;}div.hexo-img-readStream readItems img{padding-bottom:10px;max-width: 84%;margin-top: 0.7em;}div.hexo-img-readStream readItems figcaption{font-size:.7rem;color:#999;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align: center;}div.hexo-img-readStream small{font-size:1rem;float:right;text-transform:uppercase;color:#aaa}div.hexo-img-readStream small a{color:#666;text-decoration:none;transition:.4s color}@media screen and (max-width:750px){.hexo-img-readStream{column-gap:0}}';
  result += '</style>';
  result += content;
  result += '</div>';
  result += '<script type="text/javascript">$(\'img.hexo-image-stream-lazy\').lazyload({ effect:\'fadeIn\' });</script>';
  return result;
}, {ends: true});

hexo.extend.tag.register('readItems', function(args){
  var wordUrl = args.shift();
  //var title = args.join(' ');
  var placeholder = config['img_placeholder'];
  var imgUrl = args.shift();
  var title = args.shift();

  var result = '<readItems>';
  result += '<a href="' + wordUrl + '" target="_blank" rel="external">'
  result += '<img class="hexo-image-stream-lazy nofancy" src="' + placeholder + '" data-original="' + imgUrl + '"/>';
  result += '<noscript><img src="' + imgUrl + '"/></noscript>' + '</a>';
  result += '<figcaption>'+title+'</figcaption></a>';
  
  
//   result += '<img class="hexo-image-stream-lazy nofancy" src="' + placeholder + '" data-original="' + imgUrl + '"/>';
//   result += '<noscript><img src="' + imgUrl + '"/></noscript>';
//   result += '<figcaption>' + hexo.render.renderSync({text: title, engine: 'markdown'}).replace(/<p>/, '').replace(/<.p>/, '') + '</figcaption>';
  result += '</readItems>';
  return result;
});

