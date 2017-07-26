/**
 * 웹팩의 설정 파일 셋팅 방법.
 */
/**
 * entry: {
			'entry': './entry.js'
		},
		output: {
			filename: 'bundle.js'
		},
 * 이렇게 해놓으면 webpack이라는 명령어만 쳐도 entry.js 파일을 번들링 할 수 있다.
 */
/**
 * test: /\.css$/,
 * .css 확장자로 끝나는 파일을 로드 하는 경우 
 * 
 * 
 * use: [
		'style-loader',
		'css-loader'
	]
 * 
 * css-loader와 style-loader를 거치도록 하겠다는 의미다.
 */

/**
 * IE환경을 지원하면서도 ES2015를 쓰기 위해서는 babel 같은 트랜스파일러(Transpiler)가 필수다.
 * babel을 사용하기 위해서는 preset을 설치해야 한다. 그 중 babel-preset-env는 설정된 환경에 알맞게 preset을 자동으로 설정해준다.
 * 이 라이브러리를 사용하기 위해서 presets라는 속성을 사용해서 환경을 설정할 수 있다.
 * targets: {
		browsers: ['last 2 versions']
	}
 * 위의 파일에서 설정된 환경은 브라우저 별로 최신의 두개 버전만 고려한다.
 */

/**
 * ESLint를 돌리기 위해서는 eslint-loader를 webpack설정 파일에 추가해야 한다.
 * 빌드된 파일을 Lint하는 건 소용없기 때문에 반드시 babel보다 먼저 eslint를 거치도록 해야 한다!!
 *{
		enforce: 'pre',
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'eslint-loader'
 },
 * enforce 속성을 pre로 지정하면 JavaScript 파일들이 babel-loader보다 먼저 eslint-loader를 거치게 된다.
 */
module.exports = {
		entry: {  // entry는 멀티페이지 우베사이트에서 entry를 여러개 넣어준다.
			// 하나의 entry에 여러 파일들을 넣고 싶을 때는 배열을 사용하면 된다.
			'entry': ['./main/entry.js']
			'bootstrap': ['./main/bootstrapEntry.js'],
		//	'lib': ['./lib/jquery/jquery-3.2.1.js','./lib/jstree/dist/jstree.js','./lib/jstree/dist/themes/default/style.css']
		},
		output: {
			path: __dirname +'/static',
			filename: '[name].bundle.js'
		},
		module: {
			rules: [
				{ // css
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{ // babel
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						plugins: ['syntax-dynamic-import'], // babel-plugin-syntax-dynamic-import
						presets:[[
							'env', {
								targets: {
									browsers: ['last 2 versions']
								}
							}
						]]
					}
					
				},
				{ // 기타 파일 로더 추가. yarn add --dev file-loader url-loader 후에 추가.
				      test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				      loader: 'url-loader',
				      options: {
				        name: '[hash].[ext]',
				        limit: 10000,
				      }
				}
			]
		}
};
