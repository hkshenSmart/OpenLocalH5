//
//  ViewController.m
//  OpenLocalH5
//
//  Created by wdh_sea on 2019/5/8.
//  Copyright © 2019 slrd. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

#pragma mark - 按钮方法

- (IBAction)doOpen1H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"homepage" ofType:@"html" inDirectory:@"SelfVue/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

- (IBAction)doOpen2H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"vuedemo5" ofType:@"html" inDirectory:@"SelfVue/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

- (IBAction)doOpen3H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"Zizukaimen" ofType:@"html" inDirectory:@"SelfVue/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

- (IBAction)doOpen4H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"Yijiansuoche" ofType:@"html" inDirectory:@"SelfVue/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

- (IBAction)doOpen5H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"Tingchedetail" ofType:@"html" inDirectory:@"SelfVue/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

- (IBAction)doOpen6H5:(id)sender {
    
    NSURL *htmlURL = [NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"wuliu" ofType:@"html" inDirectory:@"xj/pages"]];
    
    GuanyuH5ViewController *guanyuH5VC = [[GuanyuH5ViewController alloc] init];
    guanyuH5VC.htmlURL = htmlURL;
    UINavigationController *bgNavigationController = [[UINavigationController alloc] initWithRootViewController:guanyuH5VC];
    [self presentViewController:bgNavigationController animated:YES completion:nil];
}

@end
