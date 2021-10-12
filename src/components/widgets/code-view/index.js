
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Prism } from 'react-syntax-highlighter';

const themes = {dark: "dark", light: "light"}


const commonLangs = [
    'abnf', 'actionscript', 'ada', 'applescript', 'arduino', 'asciidoc', 'autohotkey', 'autoit', 'bash', 'basic', 'bnf', 'brainfuck', 'c', 
    'clojure', 'cmake', 'coffeescript', 'cpp', 'crystal', 'csharp', 'csp', 'css', 'd', 'dart', 'diff', 'django', 'ebnf', 'elixir', 'elm', 
    'erb', 'erlang', 'fortran', 'fsharp', 'gcode', 'gherkin', 'glsl', 'gml', 'go', 'groovy', 'haml', 'handlebars', 'haskell', 'haxe', 'http', 
    'inform7', 'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'latex', 'less', 'lisp', 'livescript', 'llvm', 'lua', 'makefile', 
    'markdown', 'matlab', 'mel', 'mizar', 'monkey', 'moonscript', 'n1ql', 'nginx', 'nim', 'nix', 'nsis', 'objectivec', 'ocaml', 'perl', 'php', 
    'powershell', 'processing', 'prolog', 'properties', 'protobuf', 'puppet', 'purebasic', 'python', 'q', 'qml', 'r', 'roboconf', 'ruby', 'rust', 
    'sas', 'scala', 'scheme', 'scss', 'smali', 'smalltalk', 'sml', 'sqf', 'sql', 'stan', 'stylus', 'swift', 'tap', 'tcl', 'twig', 'typescript', 
    'vala', 'vbnet', 'verilog', 'vhdl', 'vim', 'xquery', 'yaml'
]
const hljsLangs = [
    'oneC (1c)', 'accesslog', 'angelscript', 'apache', 'arcade', 'armasm', 'aspectj', 'avrasm', 'awk', 'axapta', 'cLike (c-like)', 'cal', 
    'capnproto', 'ceylon', 'clean', 'clojureRepl (clojure-repl)', 'coq', 'cos', 'crmsh', 'delphi', 'dns', 'dockerfile', 'dos', 'dsconfig', 
    'dts', 'dust', 'erlangRepl (erlang-repl)', 'excel', 'fix', 'flix', 'gams', 'gauss', 'golo', 'gradle', 'hsp', 'htmlbars', 'hy', 'irpf90', 
    'isbl', 'jbossCli (jboss-cli)', 'juliaRepl (julia-repl)', 'lasso', 'ldif', 'leaf', 'livecodeserver', 'lsl', 'mathematica', 'maxima', 
    'mercury', 'mipsasm', 'mojolicious', 'nodeRepl (node-repl)', 'openscad', 'oxygene', 'parser3', 'pf', 'pgsql', 'phpTemplate (php-template)', 
    'plaintext', 'pony', 'profile', 'pythonRepl (python-repl)', 'reasonml', 'rib', 'routeros', 'rsl', 'ruleslanguage', 'scilab', 'shell', 
    'stata', 'step21', 'subunit', 'taggerscript', 'thrift', 'tp', 'vbscriptHtml (vbscript-html)', 'vbscript', 'x86asm', 'xl', 'xml', 'zephir'
]
const prismLangs = [
    'abap', 'agda', 'al', 'antlr4', 'apacheconf', 'apl', 'aql', 'arff', 'asm6502', 'aspnet', 'batch', 'bbcode', 'birb', 'bison', 'brightscript', 
    'bro', 'bsl', 'cil', 'clike', 'concurnas', 'cssExtras (css-extras)', 'cypher', 'dax', 'dhall', 'dnsZoneFile (dns-zone-file)', 'docker', 
    'editorconfig', 'eiffel', 'ejs', 'etlua', 'excelFormula (excel-formula)', 'factor', 'firestoreSecurityRules (firestore-security-rules)', 
    'flow', 'ftl', 'gdscript', 'gedcom', 'git', 'graphql', 'hcl', 'hlsl', 'hpkp', 'hsts', 'ichigojam', 'icon', 'iecst', 'ignore', 'io', 'j', 
    'javadoc', 'javadoclike', 'javastacktrace', 'jolie', 'jq', 'jsExtras (js-extras)', 'jsTemplates (js-templates)', 'jsdoc', 'json5', 'jsonp', 
    'jsstacktrace', 'jsx', 'keyman', 'latte', 'lilypond', 'liquid', 'lolcode', 'markupTemplating (markup-templating)', 'markup', 'mongodb', 
    'n4js', 'nand2tetrisHdl (nand2tetris-hdl)', 'naniscript', 'nasm', 'neon', 'opencl', 'oz', 'parigp', 'parser', 'pascal', 'pascaligo', 'pcaxis', 
    'peoplecode', 'phpExtras (php-extras)', 'phpdoc', 'plsql', 'powerquery', 'pug', 'pure', 'purescript', 'qore', 'racket', 'reason', 'regex', 
    'renpy', 'rest', 'rip', 'robotframework', 'sass', 'shellSession (shell-session)', 'smarty', 'solidity', 'solutionFile (solution-file)', 'soy', 
    'sparql', 'splunkSpl (splunk-spl)', 't4Cs (t4-cs)', 't4Templating (t4-templating)', 't4Vb (t4-vb)', 'textile', 'toml', 'tsx', 'tt2', 'turtle', 
    'typoscript', 'unrealscript', 'velocity', 'visualBasic (visual-basic)', 'warpscript', 'wasm', 'wiki', 'xeora', 'xmlDoc (xml-doc)', 'xojo', 
    'yang', 'zig'
]

const CodeView = ({children, theme, lang, ...props}) => {
    theme = theme || themes.dark

    if(commonLangs.includes(lang) || hljsLangs.includes(lang)) {
        return (
            <SyntaxHighlighter language={lang} showLineNumbers
            style={theme == themes.dark? require("react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark").default : require("react-syntax-highlighter/dist/esm/styles/hljs/a11y-light").default} {...props}>
                {children}
            </SyntaxHighlighter>
        )

    } else {//console.log("DDD:A", darkPrism)

        return (
            <Prism language={lang} showLineNumbers
            style={require("react-syntax-highlighter/dist/esm/styles/prism/a11y-dark").default} {...props}>
                {children}
            </Prism>
        )
    }
}
CodeView.themes = themes
CodeView.languages = [...commonLangs, ...hljsLangs, ...prismLangs]
CodeView.languages.sort()

export default CodeView