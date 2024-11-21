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
            choice($.identifier, $.boolean, $.number)
        ),

        boolean: $ => choice(
            "yes",
            "no"
        ),

        number: $ => token(
            seq(
                /\d/,
                /[\.\d]*/,
            )
        ),

        identifier: $ => token(seq(
            /[a-zA-Z_]/,
            /[a-zA-Z_\d]*/,
        )),

        comment: $ => token(
            seq(
                field('start', '#'),
                field('content', alias(/[^\r\n]*/, $.comment_content))
              ),
        ),
    }
});
