[
  line_length: 140,
  inputs: ["{mix,.formatter}.exs", "{config,lib,test}/**/*.{ex,exs}"],
  import_deps: [:phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter, Styler]
]
