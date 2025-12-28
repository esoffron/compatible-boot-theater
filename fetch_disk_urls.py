#!/usr/bin/env python3
"""
Fetch disk image URLs (.woz, .dsk and .hdv files) from archive.org collection items.
For multi-disk sets, only get the first/boot disk.
"""

import json
import urllib.request
import urllib.error
import urllib.parse
import time
import sys

def fetch_metadata(identifier):
    """Fetch metadata for an archive.org identifier."""
    url = f"https://archive.org/metadata/{identifier}"
    try:
        with urllib.request.urlopen(url, timeout=30) as response:
            data = json.loads(response.read().decode())
            return data
    except urllib.error.URLError as e:
        print(f"Error fetching {identifier}: {e}", file=sys.stderr)
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON for {identifier}: {e}", file=sys.stderr)
        return None

def extract_disk_urls(identifier, metadata):
    """Extract first/boot disk URL (.woz, .dsk, or .hdv) from metadata."""
    if not metadata or 'files' not in metadata:
        return None

    # Collect all disk image files
    disk_files = []
    for file_info in metadata['files']:
        filename = file_info.get('name', '')
        if filename.endswith('.woz') or filename.endswith('.dsk') or filename.endswith('.hdv'):
            disk_files.append(filename)

    if not disk_files:
        return None

    # Priority 1: Look for files with "00playable" in the name
    for filename in disk_files:
        if '00playable' in filename.lower():
            encoded_filename = urllib.parse.quote(filename)
            return f"https://archive.org/download/{identifier}/{encoded_filename}"

    # Priority 2: Look for files with "boot" in the name
    for filename in disk_files:
        if 'boot' in filename.lower():
            encoded_filename = urllib.parse.quote(filename)
            return f"https://archive.org/download/{identifier}/{encoded_filename}"

    # Priority 3: Look for "disk 1", "side a", etc.
    for filename in disk_files:
        lower_name = filename.lower()
        if 'disk 1' in lower_name or 'disk1' in lower_name or 'side a' in lower_name:
            encoded_filename = urllib.parse.quote(filename)
            return f"https://archive.org/download/{identifier}/{encoded_filename}"

    # Priority 4: Prefer .woz over .dsk over .hdv
    for ext in ['.woz', '.dsk', '.hdv']:
        for filename in disk_files:
            if filename.endswith(ext):
                encoded_filename = urllib.parse.quote(filename)
                return f"https://archive.org/download/{identifier}/{encoded_filename}"

    # Fallback: return the first disk file found
    encoded_filename = urllib.parse.quote(disk_files[0])
    return f"https://archive.org/download/{identifier}/{encoded_filename}"

def main():
    # Load identifiers
    with open('a2_identifiers.json', 'r') as f:
        identifiers = json.load(f)

    print(f"Found {len(identifiers)} identifiers", file=sys.stderr)

    all_urls = []

    for i, identifier in enumerate(identifiers):
        print(f"Processing {i+1}/{len(identifiers)}: {identifier}", file=sys.stderr)

        metadata = fetch_metadata(identifier)
        if metadata:
            url = extract_disk_urls(identifier, metadata)
            if url:
                all_urls.append(url)
                print(f"  Found disk image", file=sys.stderr)
            else:
                print(f"  No disk images found", file=sys.stderr)

        # Be nice to archive.org - rate limit
        time.sleep(0.5)

    # Write results to JSON file
    with open('a2_disk_urls.json', 'w') as f:
        json.dump(all_urls, f, indent=2)

    print(f"\nTotal disk images found: {len(all_urls)}", file=sys.stderr)
    print(f"Results written to a2_disk_urls.json", file=sys.stderr)

if __name__ == '__main__':
    main()
