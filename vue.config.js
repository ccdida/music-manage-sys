const path = require('path');//引入path模块,为配置别名做准备
// const TerserPlugin = require('terser-webpack-plugin') 脚手架已经配置
function resolve(dir){   
	return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    productionSourceMap:false,
    css:{
        //提取css到单独的文件
        extract:true,
        sourceMap:false,
        modules:false
    },
    configureWebpack:(config)=>{
      if(process.env.NODE_ENV === 'production'){
          config.mode='production'
          let optimization={
            splitChunks: {
                // runtimeChunk:'single',
                chunks: 'all',
                minSize: 20000,  //提取出的chunk的最小大小
                minChunks: 1, //模块被引用1次以上的才抽离
                name: true,// 可以使用命名规则
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        name: 'common',
                        priority: -20
                    },
                    vendors: {  //拆分第三方库（通过npm|yarn安装的库）
                        test: /[\\/]node_modules[\\/]/,
                        name (module) {
                          
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            return `npm.${packageName.replace('@', '')}`
                        },
                        priority: -10
                    },
                    request: {  //拆分指定文件??
                        test: /(src\/network\/request\.js$)/,
                        name: 'request',
                        priority: -9
                    }
                }
            },
            // minSize:true,
            // minimizer: [new TerserPlugin({
            //     parallel: true,
            //     sourceMap: true,
            //     terserOptions: {
            //         warnings: false,
            //         compress: {
            //             drop_console: true,// 注释console
            //             drop_debugger: true, // 注释debugger
            //             pure_funcs: ["console.log"]
            //         }
            //     }
            // })]

          }
    
          Object.assign(config, {
            optimization,
           // 插件配置
           plugins:[
               ...config.plugins
           ]
          })
      }
      else{
        //   config.mode='development'
      }
  
    },
    chainWebpack:config=>{
        config.resolve.alias
        .set('@$', resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('common',resolve('src/common'))
        .set('network',resolve('src/network'))
        .set('components',resolve('src/components'))
        .set('views',resolve('src/views'))

        

    },
    devServer: {
        proxy: {
            '/api': {
              target: 'http://127.0.0.1:3000',
              changeOrigin: true,
              pathRewrite: {
                "^/api": "" 
                }
            },
      
        }
    }
}