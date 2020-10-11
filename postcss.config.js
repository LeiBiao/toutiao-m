/** 
 *postcss的配置文件
 */
module.exports = {
    // 配置要是用的相关插件
    plugins: {
        // // 用来兼容不同浏览器
        // autoprefixer: {
        //     // 写在这里控制台会有警告,因为在脚手架项目中package.json 文件里的 browserslist已经配置了兼容,所以要将browsers写到browserslist文件里
        //     browsers: ['Android >= 4.0', 'iOS >= 8'],
        // },
        //把px->rem
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};