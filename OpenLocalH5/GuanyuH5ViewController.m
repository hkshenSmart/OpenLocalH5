//
//  GuanyuH5ViewController.m
//  ZHQNHK
//
//  Created by wdh_sea on 2019/4/10.
//  Copyright © 2019 slrd. All rights reserved.
//

#import "GuanyuH5ViewController.h"

@interface GuanyuH5ViewController ()
<
WKNavigationDelegate,
WKScriptMessageHandler,
WKUIDelegate
>

@property (nonatomic, strong) WKWebView *wkWebView;
@property (nonatomic, weak) CALayer *progressLayer;

@property (nonatomic, strong) UIBarButtonItem *backItem;
@property (nonatomic, strong) UIBarButtonItem *closeItem;

@end

@implementation GuanyuH5ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    self.navigationItem.title = self.cTitle;
    
    self.view.backgroundColor = [UIColor whiteColor];
    //self.navigationItem.leftBarButtonItems = @[self.backItem, self.closeItem];
    self.navigationItem.leftBarButtonItems = @[self.backItem];
    
    [self requestH5];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    self.edgesForExtendedLayout = UIRectEdgeNone;
    self.navigationController.navigationBar.translucent = NO;
    
    //设置导航栏不透明
    [self.navigationController.navigationBar setBackgroundImage:nil forBarMetrics:0];
    //设置导航栏下面黑线不消失
    self.navigationController.navigationBar.shadowImage = nil;
    
    [self.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor blackColor]}];
    //[self.navigationController.navigationBar setBarTintColor:UIColorFromRGB(0x6C96F2)];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    self.navigationController.navigationBar.translucent = YES;
    // 移除handlers
    [self.wkWebView.configuration.userContentController removeScriptMessageHandlerForName:@"APPShare"];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

#pragma mark - 配置

- (UIBarButtonItem *)backItem {
    if (!_backItem) {
        _backItem = [[UIBarButtonItem alloc] init];
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        //UIImage *image = [UIImage imageNamed:@"appbackIcon"];
        //[button setImage:image forState:UIControlStateNormal]; //这是一张“<”的图片
        [button setTitle:@" 返回" forState:UIControlStateNormal];
        [button addTarget:self action:@selector(doBack:) forControlEvents:UIControlEventTouchUpInside];
        [button.titleLabel setFont:[UIFont systemFontOfSize:17]];
        [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
        [button sizeToFit];
        button.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
        //button.contentEdgeInsets = UIEdgeInsetsMake(0, -6, 0, 0);
        button.frame = CGRectMake(0, 0, 60, 40);
        _backItem.customView = button;
        self.navigationItem.leftBarButtonItem = _backItem;
    }
    return _backItem;
}

- (UIBarButtonItem *)closeItem {
    if (!_closeItem) {
        _closeItem = [[UIBarButtonItem alloc] initWithTitle:@"关闭" style:UIBarButtonItemStyleDone target:self action:@selector(doClose:)];
    }
    return _closeItem;
}

- (void)requestH5 {
    
    __weak typeof(self) weakSelf = self;
    WKWebViewConfiguration *webViewConfiguration = [[WKWebViewConfiguration alloc] init];
    WKUserContentController *userContentController = [[WKUserContentController alloc] init];
    webViewConfiguration.userContentController = userContentController;
    
    self.wkWebView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:webViewConfiguration];
    self.wkWebView.UIDelegate = self;
    self.wkWebView.navigationDelegate = self;
    //addScriptMessageHandler要和removeScriptMessageHandlerForName配套出现，否则会造成内存泄漏
    [webViewConfiguration.userContentController addScriptMessageHandler:self name:@"APPShare"];
    [self.view addSubview:_wkWebView];
    [_wkWebView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.right.top.bottom.equalTo(weakSelf.view).offset(0);
    }];
    // iOS11后被遗弃
    // UITableView 顶部空白
    self.automaticallyAdjustsScrollViewInsets = NO;
    
    
    // 添加属性监听
    [_wkWebView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:nil];
    [_wkWebView addObserver:self forKeyPath:@"title" options:NSKeyValueObservingOptionNew context:NULL];
    // 进度条
    UIView *progress = [[UIView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), 1)];
    progress.backgroundColor = [UIColor clearColor];
    [self.view addSubview:progress];
    
    CALayer *layer = [CALayer layer];
    layer.frame = CGRectMake(0, 0, 0, 1);
    layer.backgroundColor = [UIColor blueColor].CGColor;
    [progress.layer addSublayer:layer];
    self.progressLayer = layer;
    
    
    // 加载请求的时候忽略缓存
    //NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:self.currentRequest] cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:15.0];
    //[_wkWebView loadRequest:request];
    
    //NSURL *fileURL = [NSURL fileURLWithPath:self.currentRequest];
    //[_wkWebView loadFileURL:fileURL allowingReadAccessToURL:fileURL];
    
    [_wkWebView loadRequest:[NSURLRequest requestWithURL:self.htmlURL]];
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSString *,id> *)change context:(void *)context{
    if ([keyPath isEqualToString:@"estimatedProgress"]) {
        //NSLog(@"WKWebView estimatedProgress:%@", change);
        self.progressLayer.opacity = 1;
        self.progressLayer.frame = CGRectMake(0, 0, self.view.bounds.size.width * [change[NSKeyValueChangeNewKey] floatValue], 1);
        if ([change[NSKeyValueChangeNewKey] floatValue] == 1) {
            __weak typeof(self) weakSelf = self;
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                weakSelf.progressLayer.opacity = 0;
            });
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(.8 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                weakSelf.progressLayer.frame = CGRectMake(0, 0, 0, 1);
            });
        }
    }
    else if ([keyPath isEqualToString:@"title"]) {
        self.navigationItem.title = self.wkWebView.title;
    }
    else {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

#pragma mark - WKNavigationDelegate 代理

- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(null_unspecified WKNavigation *)navigation {
    
}

- (void)webView:(WKWebView *)webView didCommitNavigation:(null_unspecified WKNavigation *)navigation {
    
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(null_unspecified WKNavigation *)navigation {
    
    //[MBProgressHUD hideHUDForView:self.view animated:YES];
    
    NSString *jsPath = [[NSBundle mainBundle] pathForResource:@"Guanyu" ofType:@"js"];
    NSString *jsData = [NSString stringWithContentsOfFile:jsPath encoding:NSUTF8StringEncoding error:nil];
    [webView evaluateJavaScript:[NSString stringWithFormat:@"javascript:%@", jsData] completionHandler:nil];
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(null_unspecified WKNavigation *)navigation withError:(NSError *)error {
    
    NSLog(@"打开网站失败:%@", error);
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    
    NSString *targetUrl = [navigationAction.request.URL.absoluteString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
    NSLog(@"WKWebView url:%@", targetUrl);
    
    decisionHandler(WKNavigationActionPolicyAllow);
}

#pragma mark - WKScriptMessageHandler 代理
// 点击H5后在OC页面上显示
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    
    // 与js交互前端需要用 window.webkit.messageHandlers.注册的方法名.postMessage({body:传输的数据} 来给native发送消息
    if ([message.name isEqualToString:@"APPShare"]) {
        // 将结果返回给js
        NSDictionary *bodyDict = (NSDictionary *)message.body;
        NSString *mark = bodyDict[@"body"];
        if ([mark isEqualToString:@"share0"] || [mark isEqualToString:@"share1"]) {
            /*
            if (![[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"weixin://"]]) {
                // 微信建议把微信登录的按钮隐藏掉
                [self.view makeToast:@"您还没有安装微信" duration:Toast_duration position:CSToastPositionCenter style:[[AccountManager sharedInstance] setupToastStyle]];
                return;
            }
            */
            /*
            SendMessageToWXReq *messageToWXReq = [[SendMessageToWXReq alloc] init];
            messageToWXReq.bText = NO;
            //WXSceneSession  = 0   // 聊天界面
            //WXSceneTimeline = 1   // 朋友圈
            //WXSceneFavorite = 2
            if ([mark isEqualToString:@"share1"]) {
                // 微信好友
                messageToWXReq.scene = WXSceneSession;
            }
            if ([mark isEqualToString:@"share0"]) {
                // 朋友圈
                messageToWXReq.scene = WXSceneTimeline;
            }
            
            WXMediaMessage *urlMessage = [WXMediaMessage message];
            NSString *shareTitle = [NSString stringWithFormat:@"智慧黔南"];
            urlMessage.title = shareTitle;
            urlMessage.description = @"我用了这个应该，很好用，快来试试吧!";
            // 分享图片,使用SDK的setThumbImage方法可压缩图片大小
            [urlMessage setThumbImage:[UIImage imageNamed:@"appImage"]];
            
            // 创建多媒体对象
            WXWebpageObject *urlObj = [WXWebpageObject object];
            // 分享链接
            NSString *shareUrl = [NSString stringWithFormat:ShareUrlH5];
            urlObj.webpageUrl = shareUrl;
            
            //完成发送对象实例
            urlMessage.mediaObject = urlObj;
            messageToWXReq.message = urlMessage;
            
            // 发送分享信息
            [WXApi sendReq:messageToWXReq];
            */
        }
        if ([mark isEqualToString:@"share2"] || [mark isEqualToString:@"share3"]) {
            /*
            TencentOAuth *tencentOAuth = [[TencentOAuth alloc] initWithAppId:QQAPPID andDelegate:nil]; //注册
            NSLog(@"注册QQ:%@", tencentOAuth);
            if ([TencentOAuth iphoneQQInstalled]) {
                NSString *utf8String = ShareUrlH5;
                NSString *title = @"智慧黔南";
                NSString *description = @"我用了这个应该，很好用，快来试试吧!";
                QQApiNewsObject *newsObj = [QQApiNewsObject
                                            objectWithURL:[NSURL URLWithString:utf8String]
                                            title:title
                                            description:description
                                            previewImageURL:nil];
                SendMessageToQQReq *req = [SendMessageToQQReq reqWithContent:newsObj];
                
                if ([mark isEqualToString:@"share2"]) {
                    // QQ空间
                    QQApiSendResultCode sent = [QQApiInterface SendReqToQZone:req];
                    NSLog(@"QQ空间sent:%d", sent);
                }
                if ([mark isEqualToString:@"share3"]) {
                    // QQ好友
                    QQApiSendResultCode sent = [QQApiInterface sendReq:req];
                    NSLog(@"QQ好友sent:%d", sent);
                }
            }
            else {
                // 建议将QQ登录的按钮隐藏掉
                [self.view makeToast:@"您还没有安装手机QQ" duration:Toast_duration position:CSToastPositionCenter style:[[AccountManager sharedInstance] setupToastStyle]];
            }
            */
        }
    }
}

#pragma mark - WKUIDelegate 代理
// 响应JS里的alert提醒
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"提醒" message:message preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }]];
    
    [self presentViewController:alertController animated:YES completion:nil];
}

#pragma mark - 按钮方法

- (void)doBack:(UIButton *)button {
    
    if ([self.wkWebView canGoBack]) { //判断当前的H5页面是否可以返回
        // 如果可以返回，则返回到上一个H5页面，并在左上角添加一个关闭按钮
        [self.wkWebView goBack];
        //self.navigationItem.leftBarButtonItems = @[self.backItem, self.closeItem];
        self.navigationItem.leftBarButtonItems = @[self.backItem];
    }
    else {
        // 如果不可以返回，则直接
        //[self.navigationController popViewControllerAnimated:YES];
        [self dismissViewControllerAnimated:YES completion:nil];
    }
}

- (void)doClose:(UIBarButtonItem *)sender {
    
    //[self.navigationController popViewControllerAnimated:YES];
    [self dismissViewControllerAnimated:YES completion:nil];
}

#pragma mark - 生命

- (void)dealloc {
    
    [self.wkWebView removeObserver:self forKeyPath:@"estimatedProgress"];
    // 移除handlers
    [self.wkWebView.configuration.userContentController removeScriptMessageHandlerForName:@"APPShare"];
}

@end
