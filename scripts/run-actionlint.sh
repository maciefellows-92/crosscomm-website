#!/usr/bin/env bash
# actionlint 1.7.12. Checksums are from the GitHub release asset
# actionlint_1.7.12_checksums.txt, read on 2026-10-04. CI has no Homebrew binary.
set -euo pipefail
cd "$(dirname "$0")/.."

if command -v actionlint >/dev/null 2>&1; then
  exec actionlint "$@"
fi

version=1.7.12
os="$(uname -s | tr '[:upper:]' '[:lower:]')"
arch="$(uname -m)"
case "${os}-${arch}" in
  darwin-arm64)
    file="actionlint_${version}_darwin_arm64.tar.gz"
    sum="aba9ced2dee8d27fecca3dc7feb1a7f9a52caefa1eb46f3271ea66b6e0e6953f"
    ;;
  darwin-x86_64)
    file="actionlint_${version}_darwin_amd64.tar.gz"
    sum="5b44c3bc2255115c9b69e30efc0fecdf498fdb63c5d58e17084fd5f16324c644"
    ;;
  linux-x86_64)
    file="actionlint_${version}_linux_amd64.tar.gz"
    sum="8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8"
    ;;
  linux-aarch64)
    file="actionlint_${version}_linux_arm64.tar.gz"
    sum="325e971b6ba9bfa504672e29be93c24981eeb1c07576d730e9f7c8805afff0c6"
    ;;
  *)
    echo "No pinned actionlint binary for ${os}-${arch}. Install actionlint ${version}." >&2
    exit 1
    ;;
esac

mkdir -p .tools
dest=".tools/actionlint-${version}"
if [[ ! -x "${dest}" ]]; then
  tmp="$(mktemp -d)"
  curl -fsSL -o "${tmp}/${file}" "https://github.com/rhysd/actionlint/releases/download/v${version}/${file}"
  echo "${sum}  ${tmp}/${file}" | shasum -a 256 -c -
  tar -xzf "${tmp}/${file}" -C "${tmp}" actionlint
  mv "${tmp}/actionlint" "${dest}"
  chmod +x "${dest}"
  rm -rf "${tmp}"
fi

exec "${dest}" "$@"
