/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
    name: "ck3",

    extras: $ => [ $.comment, /\s/ ],

    rules: {
        source_file: $ => repeat($._top_level),

        _top_level: $ => choice(
            $.definition,
        ),

        definition: $ => seq(
            "@",
            $.identifier,
            "=",
            choice($.identifier)
        ),

        identifier: $ => token(seq(
            /[a-zA-Z_]+/
        )),

        comment: $ => token(
            seq(
                field('start', '#'),
                field('content', alias(/[^\r\n]*/, $.comment_content))
              ),
        ),
    }
});
