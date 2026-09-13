const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

// Keep labels in the blog manifest so the same diagram can be localized.
export function renderSiriKnowledgeSvg(page, mobile = false) {
  const d = page.content.diagram;
  const width = mobile ? 720 : 1200;
  const height = mobile ? 1360 : 780;
  const center = width / 2;
  const fontSize = (label, max, available) => Math.min(max, available / [...label].reduce((n, ch) => n + (ch.charCodeAt(0) > 255 ? 1 : .55), 0));
  const text = (label, x, y, size = 24, color = '#eaf5ff', weight = 400, available = width - 100) => `<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${fontSize(label, size, available)}" font-weight="${weight}">${escape(label)}</text>`;
  const sourceY = mobile ? 180 : 156;
  const packY = mobile ? 230 : 205;
  const packX = mobile ? 100 : 400;
  const packW = mobile ? 568 : 400;
  const cardW = mobile ? 568 : 352;
  const cardH = mobile ? 230 : 250;
  const accents = ['#68e3e3', '#92bfff', '#b8a2ff'];
  const noteLines = [];
  let noteLine = '';
  for (const word of (page.locale.code === 'ja' ? [...d.note] : d.note.split(' '))) {
    const separator = page.locale.code === 'ja' || !noteLine ? '' : ' ';
    if ((noteLine + separator + word).length > (page.locale.code === 'ja' ? 24 : 48)) {
      noteLines.push(noteLine);
      noteLine = word;
    } else noteLine += separator + word;
  }
  if (noteLine) noteLines.push(noteLine);
  const cards = d.cards.map((lines, i) => {
    const x = mobile ? 100 : 48 + i * 376;
    const y = mobile ? 430 + i * 266 : 410;
    const cx = x + cardW / 2;
    const accent = accents[i];
    const icon = i === 0
      ? `<path d="M-19-14h38v25h-20l-12 9v-9h-6zM-10-4h20M-10 4h13"/>`
      : i === 1
      ? `<path d="M-16-19h22l10 10v29h-32zM6-19v11h10M-8 1h16M-8 10h16"/>`
      : `<circle cx="-3" cy="-3" r="14"/><path d="M8 8l13 13"/>`;
    return `<g><rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="24" fill="#0c2944" stroke="${accent}" stroke-opacity=".55"/>
      <g transform="translate(${cx},${y + 42})" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
      ${text(lines[0], cx, y + 94, mobile ? 34 : 29, '#f5fbff', 650, cardW - 44)}
      ${text(lines[1], cx, y + 137, mobile ? 28 : 22, '#bbd0e1', 400, cardW - 44)}
      ${text(lines[2], cx, y + 174, mobile ? 28 : 22, '#bbd0e1', 400, cardW - 44)}
      ${text(lines[3], cx, y + 214, mobile ? 27 : 21, accent, 600, cardW - 36)}</g>`;
  }).join('');
  const connectors = mobile
    ? `<path d="M${center} ${packY + 110}v40H60v697"/><path d="M60 545h40M60 811h40M60 1077h40"/>`
    : `<path d="M600 315v48M224 410v-47h752v47M600 363v47"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">${escape(d.title)}</title><desc id="description">${escape([d.sources, d.pack, ...d.cards.map(lines => lines.join(': ')), d.note].join('. '))}</desc>
  <defs><radialGradient id="background"><stop stop-color="#133653"/><stop offset="1" stop-color="#07182d"/></radialGradient></defs>
  <rect width="${width}" height="${height}" rx="30" fill="url(#background)"/>
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif">
  ${text(d.title, center, 73, mobile ? 38 : 44, '#f5fbff', 650)}
  ${text(d.subtitle, center, mobile ? 119 : 115, 22, '#9dbad0')}
  ${text(d.sources, center, sourceY, 22, '#bfd6e5')}
  <path d="M${center} ${sourceY + 14}v${packY - sourceY - 14}" stroke="#68e3e3" stroke-width="3"/>
  <rect x="${packX}" y="${packY}" width="${packW}" height="110" rx="22" fill="#123c57" stroke="#68e3e3"/>
  ${text(d.pack, center, packY + 46, 30, '#f5fbff', 650, packW - 40)}
  ${text(d.packDetail, center, packY + 80, 21, '#b1e7eb', 400, packW - 40)}
  <g fill="none" stroke="#6da6ba" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${connectors}</g>
  ${cards}
  ${mobile ? noteLines.map((line, i) => text(line, center, 1250 + i * 30, 23, '#aac0d0', 400, width - 80)).join('') : text(d.note, center, 720, 21, '#aac0d0', 400, width - 80)}
  </g></svg>\n`;
}
