#!/bin/sh
# Cloudflare Pages build: copy only the website into _site/ (the folder Cloudflare publishes).
# tools/, docs/ (except the store screenshots the manifest uses), fiqh-assistant-worker/ and
# the README stay out of the public site.
#   Cloudflare Pages settings:  Build command: sh tools/build-site.sh   Output directory: _site
set -e
mkdir -p _site
cp -R index.html manifest.webmanifest sw.js pages assets _site/
if [ -d docs/play-store/screenshots ]; then mkdir -p _site/docs/play-store; cp -R docs/play-store/screenshots _site/docs/play-store/; fi
if [ -d .well-known ]; then cp -R .well-known _site/; fi
echo "Built _site: $(find _site -type f | wc -l) files"
