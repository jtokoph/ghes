LIB_DIR = lib
CORE_DIR = ${LIB_DIR}/core
VENDOR_DIR = ${LIB_DIR}/vendor

CHROME_DIR = chrome
GREASEMONKEY_DIR = greasemonkey

JQUERY_FILE = ${VENDOR_DIR}/jquery.js
USERSCRIPT_FILE = ${GREASEMONKEY_DIR}/ghes.user.js

MODULES_DIR = ${LIB_DIR}/modules
MODULE_FILES = ${MODULES_DIR}/00demo.js

MODULES = ${CORE_DIR}/modules-base.js \
	${MODULE_FILES}

all: modules chrome

modules:
	@@echo "Building modules";
	@@echo ${MODULES}
	cat ${MODULES} > ${USERSCRIPT_FILE}

chrome: modules
	cp ${USERSCRIPT_FILE} ${CHROME_DIR}/ghes.js
	cp ${JQUERY_FILE} ${CHROME_DIR}/jquery.js

clean:
	rm ${USERSCRIPT_FILE} ${CHROME_DIR}/jquery.js ${CHROME_DIR}/ghes.js