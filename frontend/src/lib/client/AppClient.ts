/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { ArticlesService } from './services/ArticlesService';
import { AuthService } from './services/AuthService';
import { CabinAttachmentsService } from './services/CabinAttachmentsService';
import { CabinDatesService } from './services/CabinDatesService';
import { CabinsService } from './services/CabinsService';
import { ChartsService } from './services/ChartsService';
import { CommentsService } from './services/CommentsService';
import { CommitteesService } from './services/CommitteesService';
import { DefaultService } from './services/DefaultService';
import { DocumentsService } from './services/DocumentsService';
import { EntryService } from './services/EntryService';
import { EventsService } from './services/EventsService';
import { FamilyMembersService } from './services/FamilyMembersService';
import { FamilyTreesService } from './services/FamilyTreesService';
import { GalleriesService } from './services/GalleriesService';
import { LocationPointsService } from './services/LocationPointsService';
import { PasswordResetsService } from './services/PasswordResetsService';
import { RidesharesService } from './services/RidesharesService';
import { SearchService } from './services/SearchService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class AppClient {
    public readonly articles: ArticlesService;
    public readonly auth: AuthService;
    public readonly cabinAttachments: CabinAttachmentsService;
    public readonly cabinDates: CabinDatesService;
    public readonly cabins: CabinsService;
    public readonly charts: ChartsService;
    public readonly comments: CommentsService;
    public readonly committees: CommitteesService;
    public readonly default: DefaultService;
    public readonly documents: DocumentsService;
    public readonly entry: EntryService;
    public readonly events: EventsService;
    public readonly familyMembers: FamilyMembersService;
    public readonly familyTrees: FamilyTreesService;
    public readonly galleries: GalleriesService;
    public readonly locationPoints: LocationPointsService;
    public readonly passwordResets: PasswordResetsService;
    public readonly rideshares: RidesharesService;
    public readonly search: SearchService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://icfc.localhost:3010/api',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.articles = new ArticlesService(this.request);
        this.auth = new AuthService(this.request);
        this.cabinAttachments = new CabinAttachmentsService(this.request);
        this.cabinDates = new CabinDatesService(this.request);
        this.cabins = new CabinsService(this.request);
        this.charts = new ChartsService(this.request);
        this.comments = new CommentsService(this.request);
        this.committees = new CommitteesService(this.request);
        this.default = new DefaultService(this.request);
        this.documents = new DocumentsService(this.request);
        this.entry = new EntryService(this.request);
        this.events = new EventsService(this.request);
        this.familyMembers = new FamilyMembersService(this.request);
        this.familyTrees = new FamilyTreesService(this.request);
        this.galleries = new GalleriesService(this.request);
        this.locationPoints = new LocationPointsService(this.request);
        this.passwordResets = new PasswordResetsService(this.request);
        this.rideshares = new RidesharesService(this.request);
        this.search = new SearchService(this.request);
        this.users = new UsersService(this.request);
    }
}

