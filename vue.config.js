module.exports = {
    pages: {
		index: {
			// page 的入口
			entry: 'src/pages/index/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'EDP认证中心',
		},
		login: {
			// page 的入口
			entry: 'src/pages/login/main.js',
			// 模板来源
			template: 'public/login.html',
			// 在 dist/index.html 的输出
			filename: 'login.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'EDP认证中心-登录',
		},
	},

    baseUrl: undefined,
    lintOnSave: false, //禁用eslint
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    css: undefined
}