const container = require('markdown-it-container')

module.exports = {
  name: 'cheatsheet-container',
  extendMarkdown(md) {
    md.use(container, 'cheatsheet', {
      validate(params) {
        return params.trim().match(/^cheatsheet\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^cheatsheet\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          return '<div class="cheatsheet-code">' + md.utils.escapeHtml(m[1]) + '\n';
        }
        return '</div>\n';
      }
    });
  },
}