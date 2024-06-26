APP_ID=$(notdir $(CURDIR))
SRC=$(CURDIR)
BUILD_DIR=$(CURDIR)/build

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)
	rm -rf js

.PHONY: release
release:
	npm run build

.PHONY: package
package:
	rm -rf $(BUILD_DIR)
	mkdir -p $(BUILD_DIR)/$(APP_ID)
	cd $(SRC)
	cp -a   CHANGELOG.md \
	        LICENSE \
	        README.md \
		appinfo\
		css \
		img \
		js \
		lib \
		screenshot.png \
		templates \
		$(BUILD_DIR)/$(APP_ID)
	cd $(BUILD_DIR) ; tar -zcvf $(APP_ID).tar.gz $(APP_ID)
