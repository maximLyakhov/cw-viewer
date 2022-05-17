import {Component} from '@angular/core'

export enum FooterLink {
	Terms = 'terms-of-use',
	Privacy = 'privacy-policy',
	About = 'about us',
	Contact = 'contact-us'
}

type Link = {
	title: string
	link: FooterLink
}

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	public links: ReadonlyArray<Link> = [
		{
			title: 'Website Terms of Use',
			link: FooterLink.Terms
		},
		{
			title: 'Privacy Policy',
			link: FooterLink.Privacy
		},
		{
			title: 'About Us',
			link: FooterLink.About
		},
		{
			title: 'Contact Us',
			link: FooterLink.Contact
		}
	]
}
