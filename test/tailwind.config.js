module.exports = {
  purge: [ './pages/**/*.tsx', './components/**/*.tsx' ], // これらのファイルで使用しているtailwindoのclassのユーティリティだけをcssファイルとして出力する。これを指定しないと、存在している全てのユーティリティcssが生成されてサイズが大きくなる。
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
