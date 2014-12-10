var AttachmentModel = require('components/attachment/model'),
    packageInfo = require('../../../../package.json');

var PostModel = Parse.Object.extend({
    className: 'Post',

    defaults: {
        title: '',
        body: '',
        subtitle: '',
        seoUrl: '',
        isDraft: true,
        files: []
    },

    reset(...args) {
        args = args || [];
        this.clear({
            silent: true
        });
        delete this.id;
        args.unshift(this.defaults);
        this.set.apply(this, args);
        return this;
    },

    fetch(...args) {
        var query = new Parse.Query(PostModel);
        query.include('files').get(this.id).fail(error => {
            this.trigger('error', this, error);
        }).then(post => {
            this.set(post.toJSON(), {
                silent: true
            });
            this.set({
                files: post.get('files')
            }, {
                silent: true
            });
            this.trigger('sync', this);
        });
    },

    fetchBySeoUrl() {
        var query = new Parse.Query(PostModel);

        query.include('files')
            .equalTo('seoUrl', this.get('seoUrl'))
            .equalTo('isDraft', false)
            .first()
            .done(post => {

                if(!post){
                    this.trigger('notFound');
                    return;
                }

                this.set(post.toJSON(), {
                    silent: true
                });
                this.set({
                    files: post.get('files')
                }, {
                    silent: true
                });
                this.trigger('sync', this);
            });
    },

    save(...args) {
        var acl;

        this.unset('insertText', {
            silent: true
        });

        this.trigger('save', this);

        if (this.isNew()) {
            acl = new Parse.ACL(Parse.User.current());
            acl.setPublicReadAccess(true);

            if (Parse.User.current().id !== packageInfo.parse.adminId) {
                acl.setWriteAccess(packageInfo.parse.adminId, true);
            }
            this.setACL(acl);
        }
        return Parse.Object.prototype.save.apply(this, args);
    },

    publish() {
        this.changePublishStatus(false);
    },

    withdraw() {
        this.changePublishStatus(true);
    },

    changePublishStatus(isDraft, ...args) {
        this.set({
            isDraft: isDraft
        }, {
            silent: true
        });
        this.trigger('save', this);
        return Parse.Object.prototype.save.apply(this, args);
    },

    delaySave(delay) {
        delay = delay || 2000;

        if (this.delaySave.timeoutId) {
            window.clearTimeout(this.delaySave.timeoutId);
        }

        this.delaySave.timeoutId = window.setTimeout(() => {
            this.save();
        }, delay);
    },

    addFile(file) {
        this.get('files').push(file);
        this.save();
        return this;
    },

    removeFile(file) {
        var files = this.get('files'),
            idx = files.indexOf(file);

        file.destroy().then(() => {
            if (~idx) {
                files.splice(idx, 1);
                this.save();
            }
        });

        return this
    }

});

module.exports = PostModel;
