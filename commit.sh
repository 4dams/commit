#!/bin/sh

BASEDIR=$(dirname "$0")

# select gitmoji
GITMOJI=$(cat $BASEDIR/data/gitmoji.txt | gum filter --placeholder=" Choose gitmoji" --height=5)
test -n "$GITMOJI" && SCOPE="($GITMOJI)"

# compose commit message
SUMMARY=$(gum input --value "${GITMOJI:0:1} " --placeholder "Commit Message")

# compose commit description
DESCRIPTION=$(gum write --placeholder "Details of this change (CTRL+D to finish)")

# confirm and ship
gum confirm "Ship? 🚀" && git commit -m "$SUMMARY" -m "$DESCRIPTION"
