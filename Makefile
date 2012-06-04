LIB_DIR = lib
CORE_DIR = ${LIB_DIR}/core
VENDOR_DIR = ${LIB_DIR}/vendor
MODULES_DIR = ${LIB_DIR}/modules
ENV_DIR = ${LIB_DIR}/env

CHROME_DIR = chrome
GREASEMONKEY_DIR = greasemonkey

JQUERY_FILE = ${VENDOR_DIR}/jquery.js
USERSCRIPT_FILE = ${GREASEMONKEY_DIR}/ghes.user.js

MODULE_FILES = ${MODULES_DIR}/00demo.js \
	${MODULES_DIR}/bookmarks.js \
	${MODULES_DIR}/pullTags.js \
	${MODULES_DIR}/settings.js

MODULES = ${CORE_DIR}/modules-base.js \
	${MODULE_FILES}

FILES = ${CORE_DIR}/userscript-header.js \
	${LIB_DIR}/env.js \
	${MODULES} \
	${CORE_DIR}/core.js

default: dev

dev: devconfig all

release: prdconfig all

all: userscript chrome

devconfig:
	@@cp ${ENV_DIR}/dev.js ${LIB_DIR}/env.js

prdconfig:
	@@cp ${ENV_DIR}/prd.js ${LIB_DIR}/env.js

userscript:
	@@echo "========================="
	@@echo "== Building Userscript ==";
	@@echo "========================="
	@@echo ${FILES}
	cat ${FILES} > ${USERSCRIPT_FILE}

chrome: userscript
	@@echo "========================="
	@@echo "==   Building Chrome   ==";
	@@echo "========================="
	cp ${USERSCRIPT_FILE} ${CHROME_DIR}/ghes.js
	cp ${JQUERY_FILE} ${CHROME_DIR}/jquery.js

clean:
	rm ${USERSCRIPT_FILE} ${CHROME_DIR}/jquery.js ${CHROME_DIR}/ghes.js ${LIB_DIR}/env.js