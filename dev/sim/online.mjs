// オンライン対戦のシミュレーション。先に asobiba の src/games/dddv.js と util.js を /tmp/claude-0/ に dddv-srv.mjs / util.js としてコピーしておく
globalThis.__SRV=(await import('/tmp/claude-0/dddv-srv.mjs')).default;
const {createRequire}=await import('module');createRequire(import.meta.url)('./online.cjs');
